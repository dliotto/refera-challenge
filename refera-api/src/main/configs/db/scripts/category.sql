
CREATE SEQUENCE category_id_seq;

CREATE TABLE refera.category (
	id integer NOT NULL DEFAULT nextval('category_id_seq'),
	"name" varchar NULL,
	dt_created timestamptz NULL,
	user_created varchar NULL,
	dt_deleted timestamptz NULL,
	user_deleted varchar NULL,
	dt_updated timestamptz NULL,
	user_updated varchar NULL
);

ALTER SEQUENCE category_id_seq
OWNED BY refera.category.id;
