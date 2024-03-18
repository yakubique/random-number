import { buildOutput } from '@yakubique/atils/dist';
import * as core from '@actions/core';
import { ActionInputs, getInputs } from './io-helper';

enum Outputs {
    number = 'number',
}

const setOutputs = buildOutput(Outputs);

(async function run() {
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
})();
