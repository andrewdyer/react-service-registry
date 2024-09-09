import React from 'react';
import { ServiceRegistry } from '../../registries';
import ServiceContext from '../ServiceContext';

export interface ServiceProviderProps {
    children: React.ReactNode;
    serviceRegistry: ServiceRegistry;
}

const ServiceProvider: React.FC<ServiceProviderProps> = ({ children, serviceRegistry }) => {
    return <ServiceContext.Provider value={serviceRegistry}>{children}</ServiceContext.Provider>;
};

export default ServiceProvider;
