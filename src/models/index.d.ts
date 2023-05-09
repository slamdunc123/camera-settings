import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSetting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Setting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly image?: string | null;
  readonly aperture?: string | null;
  readonly shutter?: string | null;
  readonly iso?: string | null;
  readonly exposure_bracketing?: string | null;
  readonly white_balance?: string | null;
  readonly light_metering?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySetting = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Setting, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly image?: string | null;
  readonly aperture?: string | null;
  readonly shutter?: string | null;
  readonly iso?: string | null;
  readonly exposure_bracketing?: string | null;
  readonly white_balance?: string | null;
  readonly light_metering?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Setting = LazyLoading extends LazyLoadingDisabled ? EagerSetting : LazySetting

export declare const Setting: (new (init: ModelInit<Setting>) => Setting) & {
  copyOf(source: Setting, mutator: (draft: MutableModel<Setting>) => MutableModel<Setting> | void): Setting;
}