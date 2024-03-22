import { ActionInputs, getInputs } from './io-helper';
import * as core from '@actions/core';
import { buildOutput } from '@yakubique/atils/dist';

enum Outputs {
    number = 'number',
}

export async function run() {
    const setOutputs = buildOutput(Outputs);

    try {
        const inputs: ActionInputs = getInputs();

        const result = Math.floor(Math.random() * (inputs.max - inputs.min + 1) + inputs.min);

        setOutputs({
            number: result
        });

        core.info('Success!');
    } catch (err: any) {
        core.setFailed(err.message);
    }
}
