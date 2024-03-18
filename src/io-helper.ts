import * as core from '@actions/core';
import { getNumberInput } from '@yakubique/atils/dist';

enum Inputs {
    Min = 'min',
    Max = 'max'
}

export interface ActionInputs {
    min: number;
    max: number;
}

export function getInputs(): ActionInputs {
    const result:ActionInputs = {} as ActionInputs;

    result.min = getNumberInput(Inputs.Min, { required: false });
    result.max = getNumberInput(Inputs.Max, { required: false });

    return result;
}
