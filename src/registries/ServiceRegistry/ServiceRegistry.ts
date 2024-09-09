import { ServiceFactory } from '../../factories';

class ServiceRegistry {
    private factories: Map<string, ServiceFactory<any>> = new Map();
    private services: Map<string, any> = new Map();

    register<T>(name: string, factory: ServiceFactory<T>): void {
        if (!this.services.has(name)) {
            this.factories.set(name, factory);
        }
    }

    get<T>(name: string): T {
        if (!this.services.has(name)) {
            const factory = this.factories.get(name);
            if (!factory) {
                throw new Error(`Service ${name} not found`);
            }
            this.services.set(name, factory());
        }

        return this.services.get(name);
    }

    reset(): void {
        this.services.clear();
        this.factories.clear();
    }
}

export default ServiceRegistry;
