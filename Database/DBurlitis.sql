--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.19
-- Dumped by pg_dump version 9.5.1

-- Started on 2018-12-14 02:57:08

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
    description character varying(100) NOT NULL,
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

INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (58, 2, true, 15, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (60, 2, true, 15, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (62, 2, true, 16, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (64, 2, true, 16, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (66, 2, true, 17, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (68, 2, true, 18, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (12, 2, true, 8, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (13, 2, true, 8, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (70, 2, true, 18, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (14, 2, true, 9, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (15, 2, true, 9, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (72, 2, true, 19, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (16, 2, true, 10, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (74, 2, true, 20, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (76, 2, true, 20, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (17, 2, true, 11, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (18, 2, true, 11, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (19, 2, true, 11, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (20, 2, true, 11, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (21, 2, true, 11, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (78, 2, true, 21, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (80, 2, true, 22, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (82, 2, true, 23, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (84, 2, true, 24, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (86, 2, true, 25, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (88, 2, true, 25, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (90, 2, true, 25, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (22, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (23, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (24, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (25, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (26, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (27, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (28, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (29, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (30, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (31, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (32, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (33, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (34, 2, true, 12, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (92, 2, true, 26, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (94, 2, true, 26, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (35, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (36, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (37, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (38, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (39, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (40, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (41, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (96, 2, true, 27, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (98, 2, true, 27, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (100, 2, true, 27, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (102, 2, true, 28, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (104, 2, true, 28, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (106, 2, true, 29, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (108, 2, true, 29, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (110, 2, true, 30, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (112, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (114, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (116, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (59, 2, true, 15, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (131, 2, true, 35, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (61, 2, true, 16, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (63, 2, true, 16, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (152, 2, true, 39, true, 'https://www.linkrosa.com.br/');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (42, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (43, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (44, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (45, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (46, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (47, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (48, 2, true, 13, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (167, 1, NULL, 47, true, 'aadad');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (65, 2, true, 17, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (67, 2, true, 17, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (69, 2, true, 18, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (71, 2, true, 19, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (73, 2, true, 19, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (49, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (50, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (51, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (52, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (53, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (54, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (55, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (56, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (57, 2, true, 14, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (75, 2, true, 20, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (77, 2, true, 21, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (79, 2, true, 22, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (81, 2, true, 23, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (83, 2, true, 24, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (85, 2, true, 24, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (87, 2, true, 25, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (89, 2, true, 25, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (91, 2, true, 26, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (93, 2, true, 26, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (95, 2, true, 26, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (97, 2, true, 27, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (99, 2, true, 27, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (101, 2, true, 28, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (103, 2, true, 28, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (105, 2, true, 28, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (107, 2, true, 29, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (109, 2, true, 29, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (111, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (113, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (115, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (117, 2, true, 31, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (118, 2, true, 32, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (119, 2, true, 32, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (120, 2, true, 32, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (121, 2, true, 32, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (122, 2, true, 32, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (123, 2, true, 33, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (124, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (125, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (126, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (127, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (128, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (129, 2, true, 34, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (130, 2, true, 35, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (132, 2, true, 35, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (133, 2, true, 35, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (134, 2, true, 36, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (135, 2, true, 36, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (136, 2, true, 36, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (137, 2, true, 36, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (138, 2, true, 36, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (139, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (140, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (141, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (142, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (143, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (144, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (145, 2, true, 37, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (146, 2, true, 38, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (147, 2, true, 38, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (148, 2, true, 38, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (149, 2, true, 38, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (150, 2, true, 38, NULL, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (151, 2, true, 39, true, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (153, 2, NULL, 39, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (154, 2, NULL, 40, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (155, 2, NULL, 41, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (156, 2, true, 41, true, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (157, 2, NULL, 42, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (158, 2, true, 42, true, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (159, 1, NULL, 43, false, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (160, 2, NULL, 43, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (161, 2, NULL, 44, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (162, 2, NULL, 45, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (163, 2, true, 45, true, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (164, 2, NULL, 46, true, 'https://www.google.com/search?q=cytotec&oq=cytotec&aqs=chrome..69i57j69i60.17347j0j7&sourceid=chrome&ie=UTF-8');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (165, 2, true, 46, true, 'https://www.photoacompanhantes.com/acompanhantes/sao-paulo/capital');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (166, 2, true, 47, true, 'https://www.linkrosa.com.br/');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (169, 1, NULL, 48, true, 'www.googlea.com');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (168, 2, true, 48, true, 'https://www.linkrosa.com.br/');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (170, 1, NULL, 49, false, 'https://www.googlea.com/');
INSERT INTO analysis (ana_id, sta_id, restricted, pro_id, validated, url) VALUES (171, 2, true, 49, true, 'https://www.linkrosa.com.br/');


--
-- TOC entry 2003 (class 0 OID 74936)
-- Dependencies: 174
-- Data for Name: analysis_reason; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2007 (class 0 OID 83172)
-- Dependencies: 178
-- Data for Name: image_restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2005 (class 0 OID 74986)
-- Dependencies: 176
-- Data for Name: ml_rule; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 1998 (class 0 OID 74908)
-- Dependencies: 169
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO project (pro_id, numero) VALUES (8, NULL);
INSERT INTO project (pro_id, numero) VALUES (9, NULL);
INSERT INTO project (pro_id, numero) VALUES (10, NULL);
INSERT INTO project (pro_id, numero) VALUES (11, NULL);
INSERT INTO project (pro_id, numero) VALUES (12, NULL);
INSERT INTO project (pro_id, numero) VALUES (13, NULL);
INSERT INTO project (pro_id, numero) VALUES (14, NULL);
INSERT INTO project (pro_id, numero) VALUES (15, NULL);
INSERT INTO project (pro_id, numero) VALUES (16, NULL);
INSERT INTO project (pro_id, numero) VALUES (17, NULL);
INSERT INTO project (pro_id, numero) VALUES (18, NULL);
INSERT INTO project (pro_id, numero) VALUES (19, NULL);
INSERT INTO project (pro_id, numero) VALUES (20, NULL);
INSERT INTO project (pro_id, numero) VALUES (21, NULL);
INSERT INTO project (pro_id, numero) VALUES (22, NULL);
INSERT INTO project (pro_id, numero) VALUES (23, NULL);
INSERT INTO project (pro_id, numero) VALUES (24, NULL);
INSERT INTO project (pro_id, numero) VALUES (25, NULL);
INSERT INTO project (pro_id, numero) VALUES (26, NULL);
INSERT INTO project (pro_id, numero) VALUES (27, NULL);
INSERT INTO project (pro_id, numero) VALUES (28, NULL);
INSERT INTO project (pro_id, numero) VALUES (29, NULL);
INSERT INTO project (pro_id, numero) VALUES (30, NULL);
INSERT INTO project (pro_id, numero) VALUES (31, NULL);
INSERT INTO project (pro_id, numero) VALUES (32, NULL);
INSERT INTO project (pro_id, numero) VALUES (33, NULL);
INSERT INTO project (pro_id, numero) VALUES (34, NULL);
INSERT INTO project (pro_id, numero) VALUES (35, NULL);
INSERT INTO project (pro_id, numero) VALUES (36, NULL);
INSERT INTO project (pro_id, numero) VALUES (37, NULL);
INSERT INTO project (pro_id, numero) VALUES (38, NULL);
INSERT INTO project (pro_id, numero) VALUES (39, NULL);
INSERT INTO project (pro_id, numero) VALUES (40, NULL);
INSERT INTO project (pro_id, numero) VALUES (41, NULL);
INSERT INTO project (pro_id, numero) VALUES (42, NULL);
INSERT INTO project (pro_id, numero) VALUES (43, NULL);
INSERT INTO project (pro_id, numero) VALUES (44, NULL);
INSERT INTO project (pro_id, numero) VALUES (45, NULL);
INSERT INTO project (pro_id, numero) VALUES (46, NULL);
INSERT INTO project (pro_id, numero) VALUES (47, NULL);
INSERT INTO project (pro_id, numero) VALUES (48, NULL);
INSERT INTO project (pro_id, numero) VALUES (49, NULL);


--
-- TOC entry 2002 (class 0 OID 74931)
-- Dependencies: 173
-- Data for Name: regex_restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO regex_restriction (reg_res_id, description, rule, res_id) VALUES (1, '.*(acompanhante).*', 'topico relacionado a la prostituicion', NULL);
INSERT INTO regex_restriction (reg_res_id, description, rule, res_id) VALUES (2, '.*(tabaco|cigarro).*', 'venda de tabaco', NULL);


--
-- TOC entry 2004 (class 0 OID 74943)
-- Dependencies: 175
-- Data for Name: report_state; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2006 (class 0 OID 74994)
-- Dependencies: 177
-- Data for Name: restriction; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2020 (class 0 OID 0)
-- Dependencies: 180
-- Name: sec_analysis; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('sec_analysis', 171, true);


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

SELECT pg_catalog.setval('sec_project', 49, true);


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



--
-- TOC entry 2001 (class 0 OID 74926)
-- Dependencies: 172
-- Data for Name: status_site; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO status_site (sta_id, nombre, style) VALUES (1, 'waiting', 'bg-warning');
INSERT INTO status_site (sta_id, nombre, style) VALUES (3, 'sent', 'bg-success');
INSERT INTO status_site (sta_id, nombre, style) VALUES (2, 'process', 'bg-info');


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
-- TOC entry 1887 (class 2606 OID 99673)
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


-- Completed on 2018-12-14 02:57:09

--
-- PostgreSQL database dump complete
--

