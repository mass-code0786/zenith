import "server-only";

import { importPKCS8, SignJWT } from "jose";

const tokenUrl = "https://oauth2.googleapis.com/token";
const dataApiBaseUrl = "https://analyticsdata.googleapis.com/v1beta";
const readonlyScope = "https://www.googleapis.com/auth/analytics.readonly";
const disconnectedMessage =
  "Google Analytics API is not connected. Add GA4 credentials to enable admin analytics.";

type MetricValue = string;

type RunReportResponse = {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: MetricValue }>;
  }>;
  totals?: Array<{
    metricValues?: Array<{ value?: MetricValue }>;
  }>;
};

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  error?: string;
  error_description?: string;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

export type AnalyticsDatePoint = {
  date: string;
  visitors: number;
  pageViews: number;
};

export type AnalyticsDevice = {
  device: string;
  users: number;
};

export type AnalyticsCountry = {
  country: string;
  users: number;
};

export type AnalyticsCity = {
  city: string;
  country: string;
  users: number;
};

export type AnalyticsPage = {
  path: string;
  title: string;
  views: number;
  users: number;
};

export type AnalyticsSource = {
  source: string;
  users: number;
};

export class GoogleAnalyticsNotConnectedError extends Error {
  constructor() {
    super(disconnectedMessage);
    this.name = "GoogleAnalyticsNotConnectedError";
  }
}

export function analyticsDisconnectedResponse() {
  return {
    connected: false as const,
    message: disconnectedMessage,
  };
}

function getCredentials() {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    throw new GoogleAnalyticsNotConnectedError();
  }

  return { propertyId, clientEmail, privateKey };
}

function metricValue(response: RunReportResponse, index: number) {
  return Number(response.totals?.[0]?.metricValues?.[index]?.value ?? 0);
}

function rowMetric(
  row: NonNullable<RunReportResponse["rows"]>[number],
  index: number,
) {
  return Number(row.metricValues?.[index]?.value ?? 0);
}

function rowDimension(
  row: NonNullable<RunReportResponse["rows"]>[number],
  index: number,
) {
  return row.dimensionValues?.[index]?.value ?? "";
}

function formatGaDate(value: string) {
  if (!/^\d{8}$/.test(value)) {
    return value;
  }

  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
}

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.token;
  }

  const { clientEmail, privateKey } = getCredentials();
  const key = await importPKCS8(privateKey, "RS256");
  const assertion = await new SignJWT({ scope: readonlyScope })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(clientEmail)
    .setAudience(tokenUrl)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(key);

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const data = (await response.json()) as TokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ?? data.error ?? "Unable to authenticate Google Analytics API.",
    );
  }

  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };

  return cachedToken.token;
}

export async function runAnalyticsReport(body: Record<string, unknown>) {
  const { propertyId } = getCredentials();
  const token = await getAccessToken();
  const response = await fetch(
    `${dataApiBaseUrl}/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as RunReportResponse;
}

export async function runRealtimeAnalyticsReport(body: Record<string, unknown>) {
  const { propertyId } = getCredentials();
  const token = await getAccessToken();
  const response = await fetch(
    `${dataApiBaseUrl}/properties/${propertyId}:runRealtimeReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return (await response.json()) as RunReportResponse;
}

export async function getAnalyticsOverview() {
  const [
    today,
    yesterday,
    total,
    last7Days,
    last30Days,
    trafficSources,
  ] = await Promise.all([
    runAnalyticsReport({
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
      metricAggregations: ["TOTAL"],
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "yesterday", endDate: "yesterday" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
      metricAggregations: ["TOTAL"],
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "2020-01-01", endDate: "today" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
      metricAggregations: ["TOTAL"],
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
      metricAggregations: ["TOTAL"],
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
      limit: 8,
    }),
  ]);

  return {
    todayVisitors: metricValue(today, 0),
    yesterdayVisitors: metricValue(yesterday, 0),
    totalVisitors: metricValue(total, 0),
    pageViews: metricValue(total, 1),
    last30DaysVisitors: metricValue(last30Days, 0),
    last30DaysPageViews: metricValue(last30Days, 1),
    visitorsLast7Days:
      last7Days.rows?.map((row) => ({
        date: formatGaDate(rowDimension(row, 0)),
        visitors: rowMetric(row, 0),
        pageViews: rowMetric(row, 1),
      })) ?? [],
    trafficSources:
      trafficSources.rows?.map((row) => ({
        source: rowDimension(row, 0) || "Unassigned",
        users: rowMetric(row, 0),
      })) ?? [],
  };
}

export async function getRealtimeUsers() {
  const response = await runRealtimeAnalyticsReport({
    metrics: [{ name: "activeUsers" }],
    metricAggregations: ["TOTAL"],
  });

  return { activeUsers: metricValue(response, 0) };
}

export async function getTopPages() {
  const response = await runAnalyticsReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "pagePathPlusQueryString" }, { name: "pageTitle" }],
    metrics: [{ name: "screenPageViews" }, { name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });

  return {
    pages:
      response.rows?.map((row) => ({
        path: rowDimension(row, 0) || "/",
        title: rowDimension(row, 1) || "Untitled page",
        views: rowMetric(row, 0),
        users: rowMetric(row, 1),
      })) ?? [],
  };
}

export async function getDeviceAnalytics() {
  const response = await runAnalyticsReport({
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
  });

  const devices =
    response.rows?.map((row) => ({
      device: rowDimension(row, 0) || "unknown",
      users: rowMetric(row, 0),
    })) ?? [];

  return {
    devices,
    mobileUsers: devices.find((item) => item.device === "mobile")?.users ?? 0,
    desktopUsers: devices.find((item) => item.device === "desktop")?.users ?? 0,
  };
}

export async function getCountryAnalytics() {
  const [countries, cities] = await Promise.all([
    runAnalyticsReport({
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "country" }],
      metrics: [{ name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
      limit: 10,
    }),
    runAnalyticsReport({
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "city" }, { name: "country" }],
      metrics: [{ name: "totalUsers" }],
      orderBys: [{ metric: { metricName: "totalUsers" }, desc: true }],
      limit: 10,
    }),
  ]);

  const countryRows =
    countries.rows?.map((row) => ({
      country: rowDimension(row, 0) || "Unknown",
      users: rowMetric(row, 0),
    })) ?? [];

  return {
    topCountry: countryRows[0]?.country ?? "No data",
    countries: countryRows,
    cities:
      cities.rows?.map((row) => ({
        city: rowDimension(row, 0) || "Unknown",
        country: rowDimension(row, 1) || "Unknown",
        users: rowMetric(row, 0),
      })) ?? [],
  };
}

