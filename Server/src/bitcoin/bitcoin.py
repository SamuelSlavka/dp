''' Bitcoin data handling '''

import requests
import ast
import json
from .jsonRPC import *
from .btc_zok_utils import *
from .btc_header_manipulation import BlockHeader
import json
import subprocess
import shlex
import os
import subprocess
from web3 import Web3
from web3.middleware import geth_poa_middleware
from hexbytes import HexBytes
from ..constants import *

def get_zk_input(start, end):
    try:
        zkInput = create_zok_input(start, end)
        return json.dumps(zkInput)
    except Exception as err:
        print("Error '{0}' occurred.".format(err))
        return {'error':'Error while fetching transaction'}

def create_witness(start,end):
    """ Creates witneses of local execution """
    working_directory =  os.path.split(os.path.split(os.getcwd())[0])[0] + 'src/src/smartContracts/zokrates'
    try:
        zkInput = create_zok_input(start, end)
        # compile contract
        process = subprocess.Popen('zokrates compute-witness --light -a '+ zkInput, cwd=working_directory)
        process.wait()
        return {'result':'ok'}
    except Exception as err:
        print("Error '{0}' occurred.".format(err))
        return {'error':'Error while fetching transaction'}


    
def compile_validator():
    """ Compile validator """
    working_directory =  os.path.split(os.path.split(os.getcwd())[0])[0] + 'src/src/smartContracts/zokrates'
    try:
        # compile contract
        process = subprocess.Popen('zokrates compile -i btcValidation.zok', shell=True, cwd=working_directory)
        process.wait()

        # setup zksanrks
        process = subprocess.Popen('zokrates setup', shell=True, cwd=working_directory)
        process.wait()

        # create smart contract
        process = subprocess.Popen('zokrates export-verifier', shell=True, cwd=working_directory)
        process.wait()

        # move contract to contracts
        process = subprocess.Popen('cp verifier.sol ../contracts/verifier.sol', shell=True, cwd=working_directory)
        process.wait()

        return {'result':'ok'}
    except Exception as err:
        print("Error '{0}' occurred.".format(err))
        return {'error':'Error while fetching transaction'}