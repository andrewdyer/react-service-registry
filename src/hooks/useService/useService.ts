import React from 'react';
import { ServiceContext } from '../../contexts';

const useService = <T>(name: string): T => {
    const registry = React.useContext(ServiceContext);

    return registry.get<T>(name);
};

export default useService;
