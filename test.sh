#!/bin/sh

python -m unittest -v \
    calendar_color_func_dbtests \
    calendar_options_func_dbtests \
    gen_server_func_dbtests \
    month_adj_func_dbtests \
    month_color_func_dbtests \
    month_content_func_dbtests \
    month_days_func_dbtests \
    signIn_func_dbtests \
    signUp_func_dbtests \
    signUp_func_tests

