import React from 'react';
import { render, screen } from '@testing-library/react';
import { ServiceContext } from '../../contexts';
import { ServiceRegistry } from '../../registries';
import ServiceProvider from './ServiceProvider';

class MockService {
    public value = 'Test service value';
}

const TestComponent: React.FC = () => {
    const serviceRegistry = React.useContext(ServiceContext);

    if (!serviceRegistry) {
        throw new Error('ServiceRegistry not found in context');
    }

    const service = serviceRegistry.get<MockService>('mockService');

    return <div>{service.value}</div>;
};

describe('ServiceProvider', () => {
    let serviceRegistry: ServiceRegistry;

    beforeEach(() => {
        serviceRegistry = new ServiceRegistry();
        serviceRegistry.register('mockService', () => new MockService());
    });

    test('provides ServiceRegistry to child components', () => {
        render(
            <ServiceProvider serviceRegistry={serviceRegistry}>
                <TestComponent />
            </ServiceProvider>
        );

        expect(screen.getByText('Test service value')).toBeInTheDocument();
    });

    test('throws error when ServiceRegistry is not provided', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrowError(
            'ServiceRegistry not found in context'
        );

        consoleSpy.mockRestore();
    });
});
