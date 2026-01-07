CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "image_generation" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"user_id" text NOT NULL,
	"project_id" text NOT NULL,
	"original_image_url" text NOT NULL,
	"result_image_url" text,
	"prompt" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"parent_id" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "music_track" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"artist" text,
	"category" text NOT NULL,
	"mood" text,
	"audio_url" text NOT NULL,
	"duration_seconds" integer NOT NULL,
	"bpm" integer,
	"preview_url" text,
	"waveform_url" text,
	"license_type" text DEFAULT 'royalty-free' NOT NULL,
	"attribution" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"style_template_id" text NOT NULL,
	"room_type" text,
	"thumbnail_url" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"image_count" integer DEFAULT 0 NOT NULL,
	"completed_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"workspace_id" text,
	"role" text DEFAULT 'member' NOT NULL,
	"is_system_admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_clip" (
	"id" text PRIMARY KEY NOT NULL,
	"video_project_id" text NOT NULL,
	"source_image_url" text NOT NULL,
	"image_generation_id" text,
	"end_image_url" text,
	"end_image_generation_id" text,
	"room_type" text NOT NULL,
	"room_label" text,
	"sequence_order" integer NOT NULL,
	"motion_prompt" text,
	"clip_url" text,
	"duration_seconds" integer DEFAULT 5 NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"error_message" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video_project" (
	"id" text PRIMARY KEY NOT NULL,
	"workspace_id" text NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"aspect_ratio" text DEFAULT '16:9' NOT NULL,
	"music_track_id" text,
	"music_volume" integer DEFAULT 50 NOT NULL,
	"generate_native_audio" boolean DEFAULT true NOT NULL,
	"final_video_url" text,
	"thumbnail_url" text,
	"duration_seconds" integer,
	"status" text DEFAULT 'draft' NOT NULL,
	"clip_count" integer DEFAULT 0 NOT NULL,
	"completed_clip_count" integer DEFAULT 0 NOT NULL,
	"estimated_cost" integer DEFAULT 0 NOT NULL,
	"actual_cost" integer,
	"error_message" text,
	"trigger_run_id" text,
	"trigger_access_token" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"organization_number" text,
	"contact_email" text,
	"contact_person" text,
	"logo" text,
	"primary_color" text,
	"secondary_color" text,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	"suspended_at" timestamp,
	"suspended_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workspace_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "image_generation" ADD CONSTRAINT "image_generation_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "image_generation" ADD CONSTRAINT "image_generation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "image_generation" ADD CONSTRAINT "image_generation_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_clip" ADD CONSTRAINT "video_clip_video_project_id_video_project_id_fk" FOREIGN KEY ("video_project_id") REFERENCES "public"."video_project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_clip" ADD CONSTRAINT "video_clip_image_generation_id_image_generation_id_fk" FOREIGN KEY ("image_generation_id") REFERENCES "public"."image_generation"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_clip" ADD CONSTRAINT "video_clip_end_image_generation_id_image_generation_id_fk" FOREIGN KEY ("end_image_generation_id") REFERENCES "public"."image_generation"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_project" ADD CONSTRAINT "video_project_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video_project" ADD CONSTRAINT "video_project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "image_generation_workspace_idx" ON "image_generation" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "image_generation_user_idx" ON "image_generation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "image_generation_project_idx" ON "image_generation" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "image_generation_parent_idx" ON "image_generation" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "music_track_category_idx" ON "music_track" USING btree ("category");--> statement-breakpoint
CREATE INDEX "project_workspace_idx" ON "project" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "project_user_idx" ON "project" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "project_status_idx" ON "project" USING btree ("status");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "video_clip_project_idx" ON "video_clip" USING btree ("video_project_id");--> statement-breakpoint
CREATE INDEX "video_clip_sequence_idx" ON "video_clip" USING btree ("video_project_id","sequence_order");--> statement-breakpoint
CREATE INDEX "video_clip_status_idx" ON "video_clip" USING btree ("status");--> statement-breakpoint
CREATE INDEX "video_project_workspace_idx" ON "video_project" USING btree ("workspace_id");--> statement-breakpoint
CREATE INDEX "video_project_user_idx" ON "video_project" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "video_project_status_idx" ON "video_project" USING btree ("status");