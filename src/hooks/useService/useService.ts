import React from 'react';
import { ServiceContext } from '../../contexts';

const useService = <T>(name: string): T => {
    const registry = React.useContext(ServiceContext);

    if (!registry) {
        throw new Error('ServiceRegistry not found in context');
    }

    return registry.get<T>(name);
};

export default useService;
