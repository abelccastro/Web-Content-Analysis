--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.19
-- Dumped by pg_dump version 9.5.1

-- Started on 2018-12-13 22:50:38

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 11727)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2019 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 171 (class 1259 OID 74919)
-- Name: analysis; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE analysis (
    ana_id bigint NOT NULL,
    sta_id bigint,
    restricted boolean,
    pro_id bigint,
    validated boolean,
    url character varying
);


ALTER TABLE analysis OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 74936)
-- Name: analysis_reason; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE analysis_reason (
    ana_det_id bigint NOT NULL,
    ana_id bigint,
    res_id bigint,
    reason character varying
);


ALTER TABLE analysis_reason OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 83172)
-- Name: image_restriction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE image_restriction (
    id bigint NOT NULL,
    rule character varying,
    res_id bigint
);


ALTER TABLE image_restriction OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 74986)
-- Name: ml_rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ml_rule (
    mlr_id bigint NOT NULL,
    rule character varying
);


ALTER TABLE ml_rule OWNER TO postgres;

--
-- TOC entry 169 (class 1259 OID 74908)
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE project (
    pro_id bigint NOT NULL,
    numero bigint
);


ALTER TABLE project OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 74931)
-- Name: regex_restriction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE regex_restriction (
    reg_res_id bigint NOT NULL,
    description character varying(20) NOT NULL,
    rule character varying,
    res_id bigint
);


ALTER TABLE regex_restriction OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 74943)
-- Name: report_state; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE report_state (
    rep_id bigint NOT NULL,
    ana_id bigint
);


ALTER TABLE report_state OWNER TO postgres;

--
-- TOC entry 177 (class 1259 OID 74994)
-- Name: restriction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE restriction (
    res_id bigint NOT NULL,
    description character varying,
    typename character varying
);


ALTER TABLE restriction OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 99641)
-- Name: sec_analysis; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sec_analysis
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sec_analysis OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 99643)
-- Name: sec_analysis_reason; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sec_analysis_reason
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sec_analysis_reason OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 99639)
-- Name: sec_project; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sec_project
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sec_project OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 99645)
-- Name: sec_status_site; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE sec_status_site
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE sec_status_site OWNER TO postgres;

--
-- TOC entry 170 (class 1259 OID 74913)
-- Name: site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE site (
    sit_id bigint NOT NULL,
    url character varying(100) NOT NULL,
    pro_id bigint
);


ALTER TABLE site OWNER TO postgres;

--
-- TOC entry 172 (class 1259 OID 74926)
-- Name: status_site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE status_site (
    sta_id bigint NOT NULL,
    nombre character varying(20),
    style character varying
);


ALTER TABLE status_site OWNER TO postgres;

--
-- TOC entry 2000 (class 0 OID 74919)
-- Dependencies: 171
-- Data for Name: analysis; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY analysis (ana_id, sta_id, restricted, pro_id, validated, url) FROM stdin;
58	2	t	15	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
60	2	t	15	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
12	2	t	8	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
13	2	t	8	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
14	2	t	9	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
15	2	t	9	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
16	2	t	10	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
17	2	t	11	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
18	2	t	11	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
19	2	t	11	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
20	2	t	11	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
21	2	t	11	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
22	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
23	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
24	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
25	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
26	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
27	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
28	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
29	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
30	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
31	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
32	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
33	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
34	2	t	12	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
35	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
36	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
37	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
38	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
39	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
40	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
41	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
59	2	t	15	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
42	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
43	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
44	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
45	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
46	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
47	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
48	2	t	13	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
49	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
50	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
51	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
52	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
53	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
54	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
55	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
56	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
57	2	t	14	\N	https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital
\.


--
-- TOC entry 2003 (class 0 OID 74936)
-- Dependencies: 174
-- Data for Name: analysis_reason; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY analysis_reason (ana_det_id, ana_id, res_id, reason) FROM stdin;
\.


--
-- TOC entry 2007 (class 0 OID 83172)
-- Dependencies: 178
-- Data for Name: image_restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY image_restriction (id, rule, res_id) FROM stdin;
\.


--
-- TOC entry 2005 (class 0 OID 74986)
-- Dependencies: 176
-- Data for Name: ml_rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY ml_rule (mlr_id, rule) FROM stdin;
\.


--
-- TOC entry 1998 (class 0 OID 74908)
-- Dependencies: 169
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY project (pro_id, numero) FROM stdin;
8	\N
9	\N
10	\N
11	\N
12	\N
13	\N
14	\N
15	\N
\.


--
-- TOC entry 2002 (class 0 OID 74931)
-- Dependencies: 173
-- Data for Name: regex_restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY regex_restriction (reg_res_id, description, rule, res_id) FROM stdin;
1	.*(acompanhante).*	topico relacionado a la prostituicion	\N
2	.*(tabaco|cigarro).*	venda de tabaco	\N
\.


--
-- TOC entry 2004 (class 0 OID 74943)
-- Dependencies: 175
-- Data for Name: report_state; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY report_state (rep_id, ana_id) FROM stdin;
\.


--
-- TOC entry 2006 (class 0 OID 74994)
-- Dependencies: 177
-- Data for Name: restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY restriction (res_id, description, typename) FROM stdin;
\.


--
-- TOC entry 2020 (class 0 OID 0)
-- Dependencies: 180
-- Name: sec_analysis; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sec_analysis', 60, true);


--
-- TOC entry 2021 (class 0 OID 0)
-- Dependencies: 181
-- Name: sec_analysis_reason; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sec_analysis_reason', 1, false);


--
-- TOC entry 2022 (class 0 OID 0)
-- Dependencies: 179
-- Name: sec_project; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sec_project', 15, true);


--
-- TOC entry 2023 (class 0 OID 0)
-- Dependencies: 182
-- Name: sec_status_site; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sec_status_site', 1, false);


--
-- TOC entry 1999 (class 0 OID 74913)
-- Dependencies: 170
-- Data for Name: site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY site (sit_id, url, pro_id) FROM stdin;
\.


--
-- TOC entry 2001 (class 0 OID 74926)
-- Dependencies: 172
-- Data for Name: status_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY status_site (sta_id, nombre, style) FROM stdin;
1	waiting	\N
2	process	\N
3	sent	\N
\.


--
-- TOC entry 1883 (class 2606 OID 83217)
-- Name: ID; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image_restriction
    ADD CONSTRAINT "ID" PRIMARY KEY (id);


--
-- TOC entry 1860 (class 2606 OID 74912)
-- Name: Key1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY project
    ADD CONSTRAINT "Key1" PRIMARY KEY (pro_id);


--
-- TOC entry 1863 (class 2606 OID 74918)
-- Name: Key2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY site
    ADD CONSTRAINT "Key2" PRIMARY KEY (sit_id);


--
-- TOC entry 1866 (class 2606 OID 74925)
-- Name: Key3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis
    ADD CONSTRAINT "Key3" PRIMARY KEY (ana_id);


--
-- TOC entry 1868 (class 2606 OID 74930)
-- Name: Key4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY status_site
    ADD CONSTRAINT "Key4" PRIMARY KEY (sta_id);


--
-- TOC entry 1870 (class 2606 OID 74935)
-- Name: Key5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY regex_restriction
    ADD CONSTRAINT "Key5" PRIMARY KEY (reg_res_id);


--
-- TOC entry 1874 (class 2606 OID 74942)
-- Name: Key6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis_reason
    ADD CONSTRAINT "Key6" PRIMARY KEY (ana_det_id);


--
-- TOC entry 1877 (class 2606 OID 74948)
-- Name: Key7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY report_state
    ADD CONSTRAINT "Key7" PRIMARY KEY (rep_id);


--
-- TOC entry 1879 (class 2606 OID 74993)
-- Name: mlrule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_rule
    ADD CONSTRAINT mlrule_pkey PRIMARY KEY (mlr_id);


--
-- TOC entry 1881 (class 2606 OID 75001)
-- Name: restriction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY restriction
    ADD CONSTRAINT restriction_pkey PRIMARY KEY (res_id);


--
-- TOC entry 1864 (class 1259 OID 74922)
-- Name: IX_Relationship3; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship3" ON analysis USING btree (sta_id);


--
-- TOC entry 1861 (class 1259 OID 74916)
-- Name: IX_Relationship5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship5" ON site USING btree (pro_id);


--
-- TOC entry 1871 (class 1259 OID 74939)
-- Name: IX_Relationship7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship7" ON analysis_reason USING btree (ana_id);


--
-- TOC entry 1872 (class 1259 OID 74940)
-- Name: IX_Relationship8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship8" ON analysis_reason USING btree (res_id);


--
-- TOC entry 1875 (class 1259 OID 74946)
-- Name: IX_Relationship9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Relationship9" ON report_state USING btree (ana_id);


--
-- TOC entry 1885 (class 2606 OID 99660)
-- Name: Relationship3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis
    ADD CONSTRAINT "Relationship3" FOREIGN KEY (sta_id) REFERENCES status_site(sta_id);


--
-- TOC entry 1884 (class 2606 OID 74959)
-- Name: Relationship5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY site
    ADD CONSTRAINT "Relationship5" FOREIGN KEY (pro_id) REFERENCES project(pro_id);


--
-- TOC entry 1888 (class 2606 OID 83180)
-- Name: Relationship7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis_reason
    ADD CONSTRAINT "Relationship7" FOREIGN KEY (ana_id) REFERENCES analysis(ana_id);


--
-- TOC entry 1890 (class 2606 OID 83175)
-- Name: Relationship9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY report_state
    ADD CONSTRAINT "Relationship9" FOREIGN KEY (ana_id) REFERENCES analysis(ana_id);


--
-- TOC entry 1891 (class 2606 OID 83211)
-- Name: Restriction; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY image_restriction
    ADD CONSTRAINT "Restriction" FOREIGN KEY (res_id) REFERENCES restriction(res_id);


--
-- TOC entry 1886 (class 2606 OID 99665)
-- Name: pro_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis
    ADD CONSTRAINT pro_id FOREIGN KEY (pro_id) REFERENCES project(pro_id);


--
-- TOC entry 1889 (class 2606 OID 83185)
-- Name: res_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY analysis_reason
    ADD CONSTRAINT res_id FOREIGN KEY (res_id) REFERENCES restriction(res_id);


--
-- TOC entry 1887 (class 2606 OID 83223)
-- Name: res_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY regex_restriction
    ADD CONSTRAINT res_id FOREIGN KEY (res_id) REFERENCES restriction(res_id);


--
-- TOC entry 2018 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2018-12-13 22:50:39

--
-- PostgreSQL database dump complete
--

