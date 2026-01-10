CREATE TABLE "polar_customer" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"polar_customer_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "polar_customer_workspace_id_unique" UNIQUE("workspace_id"),
	CONSTRAINT "polar_customer_polar_customer_id_unique" UNIQUE("polar_customer_id")
);
--> statement-breakpoint
DROP INDEX "project_payment_stripe_session_idx";--> statement-breakpoint
ALTER TABLE "affiliate_earning" ALTER COLUMN "invoice_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "affiliate_earning" ALTER COLUMN "invoice_amount_ore" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "affiliate_earning" ADD COLUMN "polar_order_id" text;--> statement-breakpoint
ALTER TABLE "affiliate_earning" ADD COLUMN "order_amount_cents" integer;--> statement-breakpoint
ALTER TABLE "project_payment" ADD COLUMN "polar_checkout_id" text;--> statement-breakpoint
ALTER TABLE "project_payment" ADD COLUMN "polar_order_id" text;--> statement-breakpoint
ALTER TABLE "polar_customer" ADD CONSTRAINT "polar_customer_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "polar_customer_workspace_idx" ON "polar_customer" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "polar_customer_polar_idx" ON "polar_customer" USING btree ("polar_customer_id");--> statement-breakpoint
CREATE INDEX "affiliate_earning_polar_order_idx" ON "affiliate_earning" USING btree ("polar_order_id");--> statement-breakpoint
CREATE INDEX "project_payment_polar_checkout_idx" ON "project_payment" USING btree ("polar_checkout_id");--> statement-breakpoint
CREATE INDEX "project_payment_polar_order_idx" ON "project_payment" USING btree ("polar_order_id");