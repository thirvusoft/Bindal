# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in bindal/__init__.py
from bindal import __version__ as version

setup(
	name='bindal',
	version=version,
	description='Ver13 changes for Bindal',
	author='jyoti',
	author_email='jyoti@meritsystems.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
