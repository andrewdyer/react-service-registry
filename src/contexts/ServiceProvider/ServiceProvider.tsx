import React from 'react';
import { serviceRegistry } from '../../registries';
import ServiceContext from '../ServiceContext';

export interface ServiceProviderProps {
    children: React.ReactNode;
}

const ServiceProvider: React.FC<ServiceProviderProps> = ({ children }) => {
    return <ServiceContext.Provider value={serviceRegistry}>{children}</ServiceContext.Provider>;
};

export default ServiceProvider;
