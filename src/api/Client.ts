/** @format */

import { Message, ServiceType } from "@bufbuild/protobuf";

export class Client {
  private service: ServiceType;
  private baseUrl: string;

  constructor(service: ServiceType) {
    this.baseUrl = "http://localhost:8090";
    this.service = service;
  }

  async fetch<I extends Message<I>, O extends Message<O>>(
    request: I
  ): Promise<O | undefined> {
    const json = request.toJsonString();

    //Validate the request
    const ok = validate(json);
    if (!ok) {
      throw new Error("The request is not valid");
    }

    let method = null;
    for (const methodKey in this.service.methods) {
      if (methodKey === "") {
        throw new Error(
          `The type of ${this.service.typeName} has no methods that matches the request type ${request.constructor.name}`
        );
      }
      const t = this.service.methods[methodKey];
      if (t.I === request.constructor) {
        method = t.name;
        break;
      }
    }
    try {
      const res = await fetch(
        `${this.baseUrl}/${this.service.typeName}/${method}`,
        {
          method: "POST",
          credentials: "include",
          body: json,
          /* headers: {
            "Content-Type": "application/json",
          }, */
        }
      );
      if (!res.ok) {
        console.log("fetch is != to 200");
        return undefined;
      }
      return (await res.json()) as O;
    } catch (e) {
      console.log(e);
      console.log("Error in fetch");
    }
  }
}

//This function should perhabs support recursive validation
/* function validate<T extends {}>(obj: T): boolean {
  //Validate that the message fields are valid
  for (const key in obj) {
    if (!obj[key]) {
      return false;
    }
  }
  return true;
} */
//@ts-ignore
function validate<T extends {}>(obj: T): boolean {
  // Validate that the message fields are valid
  for (const key in obj) {
    const value = obj[key];
    if (value && typeof value === "object") {
      if (!validate(value)) {
        return false;
      }
    } else if (!value) {
      return false;
    }
  }
  return true;
}
