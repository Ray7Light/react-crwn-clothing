import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
    convertCollectionsSnapshotToMap,
    firestore
} from "../../firebase/firebase.utils";

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
    try {
        const snapshot = yield firestore.collection("collections").get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}

export default function* shopSagas() {
    yield takeLatest(all[call(fetchCollectionsStart)])
}
