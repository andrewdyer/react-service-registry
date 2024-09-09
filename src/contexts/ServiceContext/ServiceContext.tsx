import React from 'react';
import { serviceRegistry } from '../../registries';

const ServiceContext = React.createContext(serviceRegistry);

export default ServiceContext;
