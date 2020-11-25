import { JSONSchema4 } from "json-schema";
import { IResource, IStaticResource, Resource, wrapResource } from "../base/Resource";
import { Condition } from "../core/types";

export interface CustomResourceDefinitionMetadata {}

export interface CustomResourceDefinitionSpec {
  conversion?:
    | { strategy: "None" }
    | {
        strategy: "Webhook";
        webhook: {
          clientConfig: {
            caBundle?: string;
          } & (
            | {
                service: {
                  name: string;
                  namespace: string;
                  path?: string;
                  port?: number;
                };
              }
            | { url: string }
          );
          conversionReviewVersions: string[];
        };
      };
  group: string;
  names: CustomResourceDefinitionNames;
  preserveUnknownFields?: boolean;
  scope: "Cluster" | "Namespaced";
  versions: Array<{
    additionalPrinterColumns?: Array<
      {
        description?: string;
        jsonPath: string;
        name: string;
        priority?: string;
      } & (
        | { type: "integer"; format?: "int32" | "int64" }
        | { type: "number"; format?: "float" | "double" }
        | { type: "string"; format?: "byte" | "binary" | "date" | "date-time" | "password" }
        | { type: "boolean" }
      )
    >;
    name: string;
    schema?: {
      openAPIV3Schema: JSONSchema4;
    };
    served: boolean;
    storage: boolean;
    subresources?: {
      scale?: {
        labelSelectorPath?: string;
        specReplicasPath: string;
        statusReplicasPath: string;
      };
      status?: {};
    };
  }>;
}

export interface CustomResourceDefinitionStatus {
  acceptedNames: CustomResourceDefinitionNames;
  storedVersions: string[];
  conditions?: Array<
    Condition<
      "Established" | "NamesAccepted" | "NonStructuralSchema" | "Terminating" | "KubernetesAPIApprovalPolicyConformant"
    >
  >;
}

interface CustomResourceDefinitionNames {
  categories?: string[];
  kind: string;
  listKind?: string;
  plural: string;
  shortNames?: string[];
  singular?: string;
}

interface CustomResourceDefinition
  extends IResource<CustomResourceDefinitionMetadata, CustomResourceDefinitionSpec, CustomResourceDefinitionStatus> {}
interface IStaticCustomResourceDefinition
  extends IStaticResource<
    CustomResourceDefinition,
    CustomResourceDefinitionMetadata,
    CustomResourceDefinitionSpec,
    CustomResourceDefinitionStatus
  > {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomResourceDefinition = wrapResource<
  CustomResourceDefinitionMetadata,
  CustomResourceDefinitionSpec,
  CustomResourceDefinitionStatus,
  CustomResourceDefinition,
  IStaticCustomResourceDefinition
>(
  // eslint-disable-next-line no-shadow
  class CustomResourceDefinition extends Resource<
    CustomResourceDefinitionMetadata,
    CustomResourceDefinitionSpec,
    CustomResourceDefinitionStatus
  > {
    protected static kind = "CustomResourceDefinition";

    protected static apiPlural = "customresourcedefinitions";

    protected static apiVersion = "apiextensions.k8s.io/v1";
  },
);
