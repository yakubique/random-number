import * as core from '@actions/core';
import * as helper from '../src/io-helper';
import { run } from '../src/run';

import { describe, expect } from '@jest/globals';


let getInputsMock: jest.SpiedFunction<typeof helper.getInputs>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;

describe('run.ts', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        getInputsMock = jest.spyOn(helper, 'getInputs').mockImplementation();
        setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation();
        setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation();
    });

    it('should work', async () => {
        getInputsMock.mockImplementation(() => {
            return {
                min: 10,
                max: 10
            } as helper.ActionInputs;
        });

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).toHaveBeenNthCalledWith(1, 'number', 10);
    });

    it('should error', async () => {
        getInputsMock.mockImplementation(() => {
            throw Error('unexpected error');
        });

        await run();
        expect(getInputsMock).toBeCalled();
        expect(setOutputMock).not.toBeCalled();
        expect(setFailedMock).toBeCalled();
    });
});

