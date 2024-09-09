import React from 'react';
import { render, screen } from '@testing-library/react';
import ServiceContext from '../../contexts/ServiceContext';
import ServiceRegistry from '../../registries/ServiceRegistry/ServiceRegistry';
import useService from './useService';

class MockService {
    public value = 'Mocked Service';
}

const MockComponent: React.FC = () => {
    const service = useService<MockService>('mockService');

    return <div>{service.value}</div>;
};

describe('useService hook with real ServiceRegistry', () => {
    let serviceRegistry: ServiceRegistry;

    beforeEach(() => {
        serviceRegistry = new ServiceRegistry();
        serviceRegistry.register('mockService', () => new MockService());
    });

    afterEach(() => {
        serviceRegistry.reset();
    });

    test('should retrieve the correct service from the real ServiceRegistry', () => {
        render(
            <ServiceContext.Provider value={serviceRegistry}>
                <MockComponent />
            </ServiceContext.Provider>
        );

        expect(screen.getByText('Mocked Service')).toBeInTheDocument();
    });

    test('should only create a service once and reuse it', () => {
        const mockServiceConstructor = jest.fn(() => new MockService());
        serviceRegistry.register('mockService', mockServiceConstructor);

        render(
            <ServiceContext.Provider value={serviceRegistry}>
                <MockComponent />
                <MockComponent />
            </ServiceContext.Provider>
        );

        expect(mockServiceConstructor).toHaveBeenCalledTimes(1);
    });
});
