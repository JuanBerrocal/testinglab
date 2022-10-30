import * as mapper from './../../common/mappers/collection.mapper';
import * as apiModel from './api/project.api-model';
//import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';


describe('Project Mapper specs', () => {
  it('When api project is undefined should return an empty project', () => {
    // Arrange
    const projectApi: apiModel.Project = undefined;

    // Act
    const result = mapProjectFromApiToVm(projectApi);

    // Assert
    expect(result).toEqual({id: '', name: '', externalId: '', comments: '', isActive: false, employees: []});
  });

  it('When api project is null should return an empty project', () => {
    // Arrange
    const projectApi: apiModel.Project = null;

    // Act
    const result = mapProjectFromApiToVm(projectApi);

    // Assert
    expect(result).toEqual({id: '', name: '', externalId: '', comments: '', isActive: false, employees: []});
  });

  it('When api project is something should return the proper view model project', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '111',
      name: 'Test Project',
      externalId: '123',
      comments: 'Nothing to comment...',
      isActive: true,
      employees: [{id: '999', isAssigned: true, employeeName: 'John Doe'}]
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toStrictEqual({id: '111', name: 'Test Project', externalId: '123', comments: 'Nothing to comment...', isActive: true,
      employees: [{id: '999', isAssigned: true, employeeName: 'John Doe'}]});
  });
  it('Should call mapToCollection', () => {
     // Arrange
     const project: apiModel.Project = {
      id: '111',
      name: 'Test Project',
      externalId: '123',
      comments: 'Nothing to comment...',
      isActive: true,
      employees: [{id: '999', isAssigned: true, employeeName: 'John Doe'}]};

    const stub = jest.spyOn(mapper, 'mapToCollection');


    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(stub).toHaveBeenCalled();
    expect(stub).toHaveBeenCalledWith([{id: '999', isAssigned: true, employeeName: 'John Doe'}], expect.any(Function));
  });
});
