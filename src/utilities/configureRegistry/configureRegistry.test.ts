import configureRegistry from './configureRegistry';
import ServiceRegistry from '../../registries/ServiceRegistry/ServiceRegistry';

class AuthService {
    public value = 'Auth Service';
}

class MockService {
    public value = 'Mock Service';
}

describe('configureRegistry', () => {
    let registry: ServiceRegistry;

    beforeEach(() => {
        registry = configureRegistry({
            authService: () => new AuthService(),
            mockService: () => new MockService()
        });
    });

    afterEach(() => {
        registry.reset();
    });

    test('should register and retrieve services', () => {
        const authService = registry.get<AuthService>('authService');
        const mockService = registry.get<MockService>('mockService');

        expect(authService).toBeInstanceOf(AuthService);
        expect(authService.value).toBe('Auth Service');

        expect(mockService).toBeInstanceOf(MockService);
        expect(mockService.value).toBe('Mock Service');
    });

    test('should throw an error when trying to retrieve a non-registered service', () => {
        expect(() => registry.get('nonExistingService')).toThrow(
            'Service nonExistingService not found'
        );
    });

    test('should return the same service instance on multiple get calls (caching)', () => {
        const service1 = registry.get<MockService>('mockService');
        const service2 = registry.get<MockService>('mockService');

        expect(service1).toBe(service2);
    });

    test('should reset the registry and clear all services and factories', () => {
        expect(registry.get<MockService>('mockService')).toBeInstanceOf(MockService);

        registry.reset();

        expect(() => registry.get('mockService')).toThrow('Service mockService not found');
    });
});
