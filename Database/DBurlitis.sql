--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: analise; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE analise (
    ana_id bigint NOT NULL,
    sta_id bigint,
    sit_id bigint
);


ALTER TABLE public.analise OWNER TO postgres;

--
-- Name: analisedetalle; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE analisedetalle (
    ana_det_id bigint NOT NULL,
    ana_id bigint,
    pol_id bigint
);


ALTER TABLE public.analisedetalle OWNER TO postgres;

--
-- Name: politica; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE politica (
    pol_id bigint NOT NULL,
    descripcion character varying(200) NOT NULL,
    msg text NOT NULL
);


ALTER TABLE public.politica OWNER TO postgres;

--
-- Name: politica_msg_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE politica_msg_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.politica_msg_seq OWNER TO postgres;

--
-- Name: politica_msg_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE politica_msg_seq OWNED BY politica.msg;


--
-- Name: projeto; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE projeto (
    pro_id bigint NOT NULL,
    numero bigint NOT NULL
);


ALTER TABLE public.projeto OWNER TO postgres;

--
-- Name: reporte_estado; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE reporte_estado (
    rep_id bigint NOT NULL,
    ana_id bigint
);


ALTER TABLE public.reporte_estado OWNER TO postgres;

--
-- Name: site; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE site (
    sit_id bigint NOT NULL,
    url character varying(100) NOT NULL,
    pro_id bigint,
    estado integer DEFAULT 0
);


ALTER TABLE public.site OWNER TO postgres;

--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE status (
    sta_id bigint NOT NULL,
    nombre character varying(20),
    descripcao character varying(20)
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: msg; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY politica ALTER COLUMN msg SET DEFAULT nextval('politica_msg_seq'::regclass);


--
-- Data for Name: analise; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: analisedetalle; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: politica; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO politica VALUES (6, '.*(cytotec|misoprostol).*', 'Conteudo de Medicanentos Abortivos!');
INSERT INTO politica VALUES (1, '.*(tabaco|cigarro).*', 'Conteudo de Tabaco!');
INSERT INTO politica VALUES (5, '.*(medicamento).*', 'Conteudo de Medicamentos!');
INSERT INTO politica VALUES (7, '.*(cocaina|ecstasy|anfetamina).*', 'Conteudo de drogas sinteticas!');
INSERT INTO politica VALUES (8, '.*(maconha|opio).*', 'Conteudo de Drogas naturais');
INSERT INTO politica VALUES (3, '.*(calibre[1-9]*).*', 'Conteudo de Armas - calibre!');
INSERT INTO politica VALUES (11, '.*(magnum).*', 'Conteudo de Armas');
INSERT INTO politica VALUES (12, '.*(arma |pistola|ak 47|revólver).*', 'Conteudo de Armas');
INSERT INTO politica VALUES (10, '.*(arma|pistola).*(r$).*', 'Conteudo de armas (nivel 2)');
INSERT INTO politica VALUES (9, '.*(acompanhante).*(contato).*', 'Conteudo Adulto (nivel 2)');
INSERT INTO politica VALUES (13, '.*(acompanhante).*(modelo).*(gata).*(celular).*', 'Conteudo Adulto! (nivel 4)');
INSERT INTO politica VALUES (14, '.*(acompanhante).*(modelo).*(gata).*	', 'Conteudo Adulto! (nivel 3)');
INSERT INTO politica VALUES (2, '.*(acompanhante).*', 'Conteudo Adulto!');
INSERT INTO politica VALUES (15, '.*(acompanhante|modelo).*(acompanhante|modelo).*(acompanhante|modelo).*(acompanhante|modelo).*(acompanhante|modelo).*	', 'Conteudo Adulto! (nivel 5)');


--
-- Name: politica_msg_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('politica_msg_seq', 2, true);


--
-- Data for Name: projeto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO projeto VALUES (1, 1);


--
-- Data for Name: reporte_estado; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: site; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO site VALUES (1, 'http://www.paginalucrativa.com.br', 1, 0);
INSERT INTO site VALUES (3, 'https://www.linkrosa.com.br/', 1, 0);
INSERT INTO site VALUES (2, 'https://www.travesticomlocal.com.br/', 1, 0);
INSERT INTO site VALUES (4, 'https://www.paudefogo.com.br/', 1, 0);


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: Key1; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY projeto
    ADD CONSTRAINT "Key1" PRIMARY KEY (pro_id);


--
-- Name: Key2; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY site
    ADD CONSTRAINT "Key2" PRIMARY KEY (sit_id);


--
-- Name: Key3; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY analise
    ADD CONSTRAINT "Key3" PRIMARY KEY (ana_id);


--
-- Name: Key4; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY status
    ADD CONSTRAINT "Key4" PRIMARY KEY (sta_id);


--
-- Name: Key5; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY politica
    ADD CONSTRAINT "Key5" PRIMARY KEY (pol_id);


--
-- Name: Key6; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY analisedetalle
    ADD CONSTRAINT "Key6" PRIMARY KEY (ana_det_id);


--
-- Name: Key7; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY reporte_estado
    ADD CONSTRAINT "Key7" PRIMARY KEY (rep_id);


--
-- Name: IX_Relationship3; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship3" ON analise USING btree (sta_id);


--
-- Name: IX_Relationship4; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship4" ON analise USING btree (sit_id);


--
-- Name: IX_Relationship5; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship5" ON site USING btree (pro_id);


--
-- Name: IX_Relationship7; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship7" ON analisedetalle USING btree (ana_id);


--
-- Name: IX_Relationship8; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship8" ON analisedetalle USING btree (pol_id);


--
-- Name: IX_Relationship9; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "IX_Relationship9" ON reporte_estado USING btree (ana_id);


--
-- Name: Relationship3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analise
    ADD CONSTRAINT "Relationship3" FOREIGN KEY (sta_id) REFERENCES status(sta_id);


--
-- Name: Relationship4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analise
    ADD CONSTRAINT "Relationship4" FOREIGN KEY (sit_id) REFERENCES site(sit_id);


--
-- Name: Relationship5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY site
    ADD CONSTRAINT "Relationship5" FOREIGN KEY (pro_id) REFERENCES projeto(pro_id);


--
-- Name: Relationship7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analisedetalle
    ADD CONSTRAINT "Relationship7" FOREIGN KEY (ana_id) REFERENCES analise(ana_id);


--
-- Name: Relationship8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analisedetalle
    ADD CONSTRAINT "Relationship8" FOREIGN KEY (pol_id) REFERENCES politica(pol_id);


--
-- Name: Relationship9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY reporte_estado
    ADD CONSTRAINT "Relationship9" FOREIGN KEY (ana_id) REFERENCES analise(ana_id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

