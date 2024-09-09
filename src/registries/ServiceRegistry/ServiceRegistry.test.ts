import ServiceRegistry from './ServiceRegistry';

class MockService {
    public value = 'Mocked Service';
}

describe('ServiceRegistry', () => {
    let registry: ServiceRegistry;

    beforeEach(() => {
        registry = new ServiceRegistry();
    });

    afterEach(() => {
        registry.reset();
    });

    test('should register and retrieve a service using a factory', () => {
        registry.register('mockService', () => new MockService());

        const service = registry.get<MockService>('mockService');

        expect(service).toBeInstanceOf(MockService);
        expect(service.value).toBe('Mocked Service');
    });

    test('should throw an error when trying to retrieve a non-registered service', () => {
        expect(() => registry.get('nonExistingService')).toThrow(
            'Service nonExistingService not found'
        );
    });

    test('should return the same service instance on multiple get calls (caching)', () => {
        registry.register('mockService', () => new MockService());

        const service1 = registry.get<MockService>('mockService');
        const service2 = registry.get<MockService>('mockService');

        expect(service1).toBe(service2);
    });

    test('should reset the registry and clear all services and factories', () => {
        registry.register('mockService', () => new MockService());

        expect(registry.get<MockService>('mockService')).toBeInstanceOf(MockService);

        registry.reset();

        expect(() => registry.get('mockService')).toThrow('Service mockService not found');
    });
});
