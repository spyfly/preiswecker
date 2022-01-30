# Dokumentation

## Über den Dienst
- Preisalarm-Service für Hardware, der Kategorien überwacht und den Nutzer bei einer Unterschreitung einer Preisgrenze benachrichtigt
- Aktuelle Lösungen lassen nur einzelne Produkte überwachen

## Umsetzung des Dienstes
![Zusammenspiel der Komponenten](../components.png)

## Programmiersprache(n) und Plattformen
- Microservices (Node.js)
- Scheduler (Bree.js)
- Web-App (Vue.js)
- Browser Extension (Javascript)
- Reverse Proxy (nginx)
- Orchestrierung (docker-compose)
- Containerisierung (Docker)
- CI/CD (Bitbucket Pipelines)

## Sicherheitsmechanismen
- JWT (wird von REST-API ausgestellt und von Clients bei Anfragen mit gesendet)
- HTTPS (SSL-Verschlüsselung)
- Trennung und Kappselung von externen und internen Traffic (über seperate Ports bei REST-API)

## Wie wurde getestet?
- Browser-Dev-Tools
- Postman
- Swagger UI
- Mit den Client-Anwendungen

## Wie wurde der Service und Client deployed?
- Bitbucket Pipelines
- docker-compose, Docker
- Custom-Skripts

## Schnittstellenbeschreibungen
- [Rest-API](../rest-api/README.md) 
  - Siehe `../rest-api/README.md` (Swagger/OpenAPI Dokumentation)
- [Crawler](../crawler/README.md)
  - Siehe `../crawler/README.md` (OpenAPI Dokumentation)
  
## Weitere Inhalte
- [Team](team.md)
- [Vorgehensweise](vorgehensweise.md)
- [Client-Anleitungen](client-anleitung.md)
- [Feedback](feedback.md)