import { combineReducers } from 'redux';

import posts from './posts';
import idPost from './idPost'
import auth from './auth'

export const reducers = combineReducers({ posts, idPost, auth });