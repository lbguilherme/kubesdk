import type { INamespacedResource } from "../base/Resource";
import { NamespacedResource, wrapNamespacedResource } from "../base/Resource";
import type { PodTemplateSpec } from "../core/Pod";
import type { Condition, LabelSelector } from "../core/types";

export interface ReplicaSetMetadata {}

export interface ReplicaSetSpec {
  minReadySeconds?: number;
  replicas?: number;
  selector: LabelSelector;
  template: PodTemplateSpec;
}

export interface ReplicaSetStatus {
  availableReplicas: number;
  conditions: Array<Condition<"ReplicaFailure">>;
  fullyLabeledReplicas: number;
  observedGeneration: number;
  readyReplicas: number;
  replicas: number;
}

export type ReplicaSet = INamespacedResource<ReplicaSetMetadata, ReplicaSetSpec, ReplicaSetStatus>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReplicaSet = wrapNamespacedResource<
  ReplicaSetMetadata,
  ReplicaSetSpec,
  ReplicaSetStatus,
  ReplicaSet,
  "ReplicaSet",
  "apps/v1"
>(
  // eslint-disable-next-line @typescript-eslint/no-shadow
  class ReplicaSet extends NamespacedResource<
    ReplicaSetMetadata,
    ReplicaSetSpec,
    ReplicaSetStatus,
    "ReplicaSet",
    "apps/v1"
  > {
    static kind = "ReplicaSet";

    protected static apiPlural = "replicasets";

    static apiVersion = "apps/v1";
  },
);
