import { renderHook, act } from '@testing-library/react-hooks';

import { useConfirmationDialog} from './confirmation-dialog.hook';
import { createEmptyLookup, Lookup } from './../../../common/models/lookup';

describe('use Confirmation Dialog specs', () => {
  it('Default case. Should return isOpen as false,itemToDelete with its default value.', () => {
    //Arrange

    //Act
    const {result} = renderHook(() => useConfirmationDialog());

    //Assert
    expect(result.current.isOpen).toEqual(false);
    expect(result.current.itemToDelete).toEqual({id: '', name: ''});
  });

  it('When dialog opens the states isOpen and itemToDelete should be updated.', () => {
    //Arrange
    const targetItem: Lookup = { id: '123', name: 'John Doe'};

    //Act
    const {result} = renderHook(() => useConfirmationDialog());
    act(() => result.current.onOpenDialog(targetItem));

    //Assert
    expect(result.current.isOpen).toEqual(true);
    expect(result.current.itemToDelete).toEqual(targetItem);
  });

  it('When item to delete is accepted the state itemToDelete should be updated to default value.', () => {
    //Arrange
    const targetItem: Lookup = { id: '123', name: 'John Doe'};

    //Act
    const {result} = renderHook(() => useConfirmationDialog());
    act(() => result.current.onAccept());

    //Assert
    expect(result.current.itemToDelete).toEqual({id:'', name:''});
  });

  it('When dialog is closed the state isOpen should be false.', () => {
    //Arrange

    //Act
    const {result} = renderHook(() => useConfirmationDialog());
    act(() => result.current.onClose());

    //Assert
    expect(result.current.isOpen).toEqual(false);
  });
});
