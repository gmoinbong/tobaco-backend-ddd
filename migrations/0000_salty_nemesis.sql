CREATE TABLE "tobacco" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand" varchar(255) NOT NULL,
	"model" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"nicotine_content" integer NOT NULL,
	"throat_hit" integer NOT NULL,
	"required_experience" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
