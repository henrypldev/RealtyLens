"use client";

import type { InvoiceHistoryRow } from "@/lib/db/queries";
import { InvoiceHistoryTable } from "./invoice-history-table";

interface BillingTabsProps {
  invoices: InvoiceHistoryRow[];
}

export function BillingTabs({ invoices }: BillingTabsProps) {
  return <InvoiceHistoryTable invoices={invoices} />;
}
