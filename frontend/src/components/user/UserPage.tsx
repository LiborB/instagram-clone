import * as React from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
    username: string;
};

export function UserPage(props: Props) {
    return (
        <div>
            {props.username}
        </div>
    );
};
