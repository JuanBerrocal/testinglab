import React from 'react';
import { SpinnerComponent } from './spinner.component';
import { render, screen, within } from '@testing-library/react';
import * as tracker from 'react-promise-tracker/lib/trackerHook';

describe('Spinner component specs', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Model shouldnt open when promiseInProgress is false', () => {
    //Arrange

    const stub = jest.spyOn(tracker, 'usePromiseTracker').
      mockReturnValue({promiseInProgress: false});

    //Act
    render(<SpinnerComponent />);
    //screen.debug();
    const modal = screen.queryByRole('presentation');

    //Assert
    expect(stub).toHaveBeenCalled();
    expect(modal).not.toBeInTheDocument();
  });

  it('Model should open when promiseInProgress is true', () => {
    //Arrange

    const stub = jest.
      spyOn(tracker, 'usePromiseTracker').
      mockReturnValue({ promiseInProgress: true });

    //Act
    render(<SpinnerComponent />);
    screen.debug();
    const modal = screen.getByRole('presentation', {hidden: true});

    //Assert
    expect(stub).toHaveBeenCalled();
    expect(modal).toBeInTheDocument();
  });
});
