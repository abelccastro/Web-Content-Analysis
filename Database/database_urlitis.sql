--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: projeto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY projeto (pro_id, numero) FROM stdin;
1	1
\.


--
-- Data for Name: site; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY site (sit_id, url, pro_id, estado) FROM stdin;
1	http://www.paginalucrativa.com.br	1	0
3	https://www.linkrosa.com.br/	1	0
2	https://www.travesticomlocal.com.br/	1	0
4	https://www.paudefogo.com.br/	1	0
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY status (sta_id, nombre, descripcao) FROM stdin;
\.


--
-- Data for Name: analise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY analise (ana_id, sta_id, sit_id) FROM stdin;
\.


--
-- Data for Name: politica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY politica (pol_id, descripcion, msg) FROM stdin;
2	.*(acompanhante).*	Tópico relacionado à prostituição
1	.*(tabaco|cigarro).*	Venda de Tabaco!!!
\.


--
-- Data for Name: analisedetalle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY analisedetalle (ana_det_id, ana_id, pol_id) FROM stdin;
\.


--
-- Name: politica_msg_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('politica_msg_seq', 2, true);


--
-- Data for Name: reporte_estado; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY reporte_estado (rep_id, ana_id) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

