/** @format */

import { Message, ServiceType } from "@bufbuild/protobuf";

export class Client {
  private service: ServiceType;
  private baseUrl: string;

  constructor(baseUrl: string, service: ServiceType) {
    this.baseUrl = baseUrl;
    this.service = service;
  }

  async fetch<I extends Message<I>, O extends Message<O>>(
    request: I
  ): Promise<O | undefined> {
    const json = request.toJsonString();

    let method = null;
    for (const methodKey in this.service.methods) {
      if (methodKey === "") {
        throw new Error(
          "The type of ${this.service.typeName} has no methods that matches the request type ${request.constructor.name}"
        );
      }
      const t = this.service.methods[methodKey];

      if (t.I === request.constructor) {
        method = t.name;
        break;
      }
    }

    //AuthGatewayService.typeName + "/" + AuthGatewayService.methods.login.name
    try {
      const res = await fetch(
        `${this.baseUrl}/${this.service.typeName}/${method}`,
        {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.json();
    } catch (e) {
      console.log(e);
    }
  }
}
