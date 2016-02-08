'use strict';

import 'styles/reset.scss';
import 'styles/dragging.scss';
import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';

render(<Index />, document.getElementById('js-main'));
