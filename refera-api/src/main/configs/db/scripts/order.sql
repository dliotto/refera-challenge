CREATE SEQUENCE order_id_seq;

CREATE TABLE refera.order (
	id integer NOT NULL DEFAULT nextval('order_id_seq'),
	"name" varchar NULL,
	"cellphone" varchar not null,
	"agency" varchar not null,
	"company" varchar not null,
	"description" varchar not null,
	"id_category" integer not null,
	"dt_deadline" timestamptz not NULL,
	dt_created timestamptz NULL,
	user_created varchar NULL,
	dt_deleted timestamptz NULL,
	user_deleted varchar NULL,
	dt_updated timestamptz NULL,
	user_updated varchar NULL
);


ALTER SEQUENCE order_id_seq
OWNED BY refera.order.id;