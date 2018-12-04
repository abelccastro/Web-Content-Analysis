# Web-Content-Analysis

Desenvolvido para a discliplina de MAC5853 Desenvolvimento de Sistemas de Computacao. 

## Project Description
Esse é um projeto da disclipima de MAC5853, para determinar e identificar que sites estão de acordo a determinadas políticas.

(Modificação 05/novembro): Todo o  modelo de classes de dados  e os testes unitarios foram desenvolvidos. 

## Requerimentos

- Java 8
- Tomcat 8.0
- Postgresql 9.3
- Maven 3.3.9
- Angular 5 

## Instalação do Banco de Dados 

O arquivo de bando de dados "DBurlitis.sql" está localizado na pasta DATABASE. 

- A instalação pode ser feito com o seguinte comando: 

  $ sudo -u postgres psql

  $$ create database "DBurlitis"

  $ sudo -u postgres psql -f DBurlitis.SQL DBurlitis

## Instalação no Ambiente (ECLIPSE)

Descargamos o respositorio e extraimos en algum endereço.

<p align="center">
  <img height="400" src="img/donwload.png">    
   
</p>

Abrimos o IDE Eclipse e selecionamos como workspace o endereçõ de nossa carpeta $uri$ do repositorio.

<p align="center">
  <img height="700" src="img/declaramosworkpace.png">    
   
</p>

Já estando no ambiente, presionamos Crtl+Shift+R e digitamos Persistence, e clickamos no arquivo.

<p align="center">
  <img height="400" src="img/persistence.png">    
   
</p>

A seguir, temos un arquivo onde fazemos a configuração para ter conetividade com o Banco de Dados do Postgresql.

<p align="center">
  <img height="400" src="img/persistence2.png">    
   
</p>

Logo, procedemos à criação do server tomcat.

<p align="center">
  <img height="400" src="img/server.png">    
   
</p>

<p align="center">
  <img height="400" src="img/server2.png">    
   
</p>

<p align="center">
  <img height="400" src="img/server3.png">    
   
</p>

e modificamos a variável de entorno do tomcat.

<p align="center">
  <img height="400" src="img/server4.png">    
   
</p>

E por último, selecionamos o modulo URIS-RES e clickamos no butão "run" e escolhemos a opção "Run on server". 

<p align="center">
  <img height="400" src="img/run.png">    
   
</p>

E vamos para nos browser e escrevemos a seguiente url: "http://localhost:8080/urisService/index". Se o processo de instalação foi feito bem, então deveriamos ter a seguinte resposta.

<p align="center">
  <img src="img/index.png">    
   
</p>

# Realizando alguns Testes.

Quando o server está ligado, entao podemos executar o arquivo post.py com o seguinte comando
- python3 post.py

O qual é enviando dados json para a seguinte url "http://localhost:8080/urisService/in", onde é retornado o análise das respetivos sites, e a razao dos seus conteúdos restritos.  

<p align="center">
  <img src="img/in.png">    
   
</p>

Hello Kitty!!!






























