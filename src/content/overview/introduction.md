# API Gateways

## Introduction

The first wave of API Gateways, historically, were offered as a component within larger API Management platforms. As the industry evolved, a new wave of API Gateways were introduced to provide solutions to a changing landscape. Some of these gateway providers are now supplementing their standalone offering with additional tools, often centered around a management approach more conducive to internal API lifecycles.

Presented here is a comprehensive, yet not entirely exhaustive, list of popular API Gateways in use today. A few areas of research have been highlighted:

- [API Gateways](/gateways/)
- [Platform Capabilities](/platform-capabilities/)
- [Gateway Capabilities](/gateway-capabilities/)
- [Delivery Models](/delivery-models/)

## Why use an API Gateway?

API Gateways are often a means of centralizing control between API Producers and Consumers. This can take a few different shapes:

- Creating a façade pattern to present a RESTful API in front of legacy services.
- Enforcing authentication and authorization.
- Rate limiting traffic.
- Routing to static or dynamic targets (e.g., phased rollouts, canary deployments).

## Real-world API Gateway deployments

While many API Gateways are looking to cover both the external and internal use cases associated with APIs, it's often common these days to see multiple gateways deployed inside a single environment.

Typically, this may take the form of a first-wave gateway platform such as Apigee Edge for external APIs and more lightweight alternatives, such as Kong, for internal use cases.

This multi-gateway reality is becoming a new normal for API practitioners today.

## Open Research

API Gateway research can be fairly extensive. Each gateway entry is labeled with one of a few different research statuses to indicate its good-enough completeness and accuracy. We are open to suggestions and welcome Pull Requests to the [postman-open-technologies/api-gateways repository](https://github.com/postman-open-technologies/api-gateways) on GitHub.
