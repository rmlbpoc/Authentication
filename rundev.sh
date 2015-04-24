#!/usr/bin/env bash
NODE_ENV=test grunt mochatests:test
NODE_ENV=development grunt serve:development