import { INamespacedResource, NamespacedResource, wrapNamespacedResource } from "../base/Resource";
import { PodTemplateSpec } from "../core/Pod";
import { LabelSelector } from "../core/types";

export interface DaemonSetMetadata {}

export interface DaemonSetSpec {
  minReadySeconds?: number;
  revisionHistoryLimit?: number;
  selector: LabelSelector;
  strategy?:
    | {
        type: "OnDelete";
      }
    | {
        type?: "RollingUpdate";
        rollingUpdate?: {
          maxUnavailable: string | number;
        };
      };
  template: PodTemplateSpec;
}

export interface DaemonSetStatus {
  collisionCount?: number;
  conditions?: [];
  currentNumberScheduled?: number;
  desiredNumberScheduled?: number;
  numberAvailable?: number;
  numberMisscheduled?: number;
  numberReady?: number;
  numberUnavailable?: number;
  observedGeneration?: number;
  updatedNumberScheduled?: number;
}

export interface DaemonSet extends INamespacedResource<DaemonSetMetadata, DaemonSetSpec, DaemonSetStatus> {}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DaemonSet = wrapNamespacedResource<
  DaemonSetMetadata,
  DaemonSetSpec,
  DaemonSetStatus,
  DaemonSet,
  "DaemonSet",
  "apps/v1"
>(
  // eslint-disable-next-line no-shadow
  class DaemonSet extends NamespacedResource<
    DaemonSetMetadata,
    DaemonSetSpec,
    DaemonSetStatus,
    "DaemonSet",
    "apps/v1"
  > {
    static kind = "DaemonSet";

    protected static apiPlural = "daemonsets";

    static apiVersion = "apps/v1";
  },
);
