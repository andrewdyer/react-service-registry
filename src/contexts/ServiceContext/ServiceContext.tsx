import React from 'react';
import { ServiceRegistry } from '../../registries';

const ServiceContext = React.createContext<ServiceRegistry | undefined>(undefined);

export default ServiceContext;
