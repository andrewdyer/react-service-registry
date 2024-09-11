import { ServiceFactory } from '../../factories';
import { ServiceRegistry } from '../../registries';

export type ServiceMap = {
    [key: string]: ServiceFactory<any>;
};

export type ServiceTypeMap<T extends { [key: string]: (...args: any[]) => any }> = {
    [K in keyof T]: ReturnType<T[K]>;
};

const configureRegistry = <T extends ServiceMap>(services: T): ServiceRegistry => {
    const registry = new ServiceRegistry();

    Object.keys(services).forEach(name => {
        registry.register(name, services[name]);
    });

    return registry;
};

export default configureRegistry;
