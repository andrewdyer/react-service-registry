import React from 'react';
import { render, screen } from '@testing-library/react';
import { serviceRegistry } from '../../registries';
import ServiceContext from '../ServiceContext';
import ServiceProvider from './ServiceProvider';

const MockChild: React.FC = () => {
    const registry = React.useContext(ServiceContext);

    return <div>{registry === serviceRegistry ? 'Registry Provided' : 'No Registry'}</div>;
};

describe('ServiceProvider', () => {
    test('should provide the serviceRegistry via context', () => {
        render(
            <ServiceProvider>
                <MockChild />
            </ServiceProvider>
        );

        expect(screen.getByText('Registry Provided')).toBeInTheDocument();
    });
});
