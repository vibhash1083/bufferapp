"""
Module with decorators to time a celery task
"""

import functools
import logging
import time

from celery import shared_task as orig_shared_task


def timeit(func):
    """A decorator used to log the function execution time."""
    logger = logging.getLogger('tasks')

    # Use functools.wraps to ensure function name is not changed
    # http://stackoverflow.com/questions/13492603/celery-task-with-multiple-decorators-not-auto-registering-task-name
    @functools.wraps(func)
    def wrap(*args, **kwargs):
        """
        wrap the function with time calculations
        """
        start = time.time()
        result = func(*args, **kwargs)
        dur = time.time() - start
        msg = {
            'task_name': func.__module__ + '.' + func.__name__,
            'duration': dur,

            # Use 'task_args' instead of 'args' because 'args' conflicts with
            # attribute of LogRecord
            'task_args': args,
            'task_kwargs': kwargs
        }
        logger.info('executed %s in %.2fs', func.__name__, dur, extra=msg)
        print('executed %s in %.2fs (info: %s)' % (func.__name__, dur, msg))
        return result

    return wrap


def shared_task(*args, **kwargs):
    """Override Celery's default shared_task decorator to log every task call.
    """
    if len(args) == 1 and callable(args[0]):
        func = args[0]
        return orig_shared_task(**kwargs)(timeit(func))

    def decorator(func):
        """
        the decorator
        """
        return orig_shared_task(*args, **kwargs)(timeit(func))

    return decorator
