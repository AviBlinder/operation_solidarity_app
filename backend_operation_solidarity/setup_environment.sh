#!/bin/bash

# Set AWS_PROFILE environment variable
export AWS_PROFILE=operation_solidarity_admin
export AWS_REGION=eu-west-1
# Create an alias for sam
alias sam="sam.cmd"

# Display a message
echo "Environment and alias are set up."
echo "AWS_PROFILE=$AWS_PROFILE"
echo "AWS_REGION=$AWS_REGION"
