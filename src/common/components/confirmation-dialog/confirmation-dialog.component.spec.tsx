
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';


describe('Confirmation dialog Component specs', () => {

  let props: any;

  beforeEach(() => {
    props =  {isOpen: true,
      onAccept: jest.fn(),
      onClose: jest.fn().mockImplementation(() => {}),
      title: 'Title',
      labels: {closeButton: 'Cancel', acceptButton:'Accept'}};
  });

  it('Should display a dialog box when isOpen is true', () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.getByRole('dialog');

    // Assert
    expect(dialog).toBeInTheDocument();
  });

  it('Should not display a dialog box when isOpen is false', () => {
    // Arrange
    props.isOpen = false;

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.queryByRole('dialog');

    // Assert
    expect(dialog).not.toBeInTheDocument();
  });

  it('Should display cancel and accept buttons with proper text', async () => {
    // Arrange

    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.getByRole('dialog');

    const [cancelButton, acceptButton] = await within(dialog).findAllByRole('button');


    // Assert
    expect(cancelButton.textContent).toEqual("Cancel");
    expect(acceptButton.textContent).toEqual("Accept");
  });

  it('Should call cancel method when cancel button is pushed', async () => {
    // Arrange


    // Act
    render(<ConfirmationDialogComponent {...props} />);

    const dialog = screen.getByRole('dialog');

    const [cancelButton, acceptButton] = await within(dialog).findAllByRole('button');

    await userEvent.click(cancelButton);

    // Assert
    expect(props.onClose).toHaveBeenCalled();

  });
});
