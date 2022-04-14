import * as React from 'react';
import { Helmet } from 'react-helmet-async';
export default function WrapHelmet(props) {
    return <Helmet {...props}/>;
}
